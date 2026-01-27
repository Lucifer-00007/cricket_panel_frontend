# Cricket API Contract

## 1. Overview
This API provides live cricket scores and match details by scraping data from multiple authoritative sources (Cricbuzz, Sportskeeda, ESPN Cricinfo, News18, Cricket Line Guru). It is deployed on Cloudflare Workers.

**Base URLs:**
*   **Production:** `https://cricket-worker.cloud-worker-api.workers.dev`
*   **Local:** `http://localhost:8787`

---

## 2. Common Data Structures

### 2.1. Standard Match Summary Object
Returned by "Live Scores" endpoints (e.g., `/cbz`, `/espn`). Most providers return a map of `MatchID -> MatchObject`.

```json
{
  "match_url": "https://source-url.com/match-detail",
  "match_api_url": "https://api-source.com/match-id", // Internal upstream API URL
  "start_date_time": "1706425200000", // Unix Timestamp (ms) or String
  "match_status": "Live", // Live, Completed, Preview, Post
  "match_league": "Indian Premier League 2024",
  "match_no": "Match 1",
  "venue": "Wankhede Stadium, Mumbai",
  "current_inns": "1", // 1, 2, 3, 4
  "t1": {
    "f": "Mumbai Indians", // Full Name
    "n": "MI",             // Short Name/Abbreviation
    "t_id": "123"          // Upstream Team ID (if available)
  },
  "t2": {
    "f": "Chennai Super Kings",
    "n": "CSK",
    "t_id": "456"
  },
  "i1": { "sc": "180", "wk": "4", "ov": "20.0" }, // Innings 1 Score
  "i2": { "sc": "160", "wk": "6", "ov": "18.2" }, // Innings 2 Score
  "cs": {
    "msg": "MI need 21 runs in 10 balls" // Current Status / Commentary Snippet
  },
  "playersOfTheMatch": { // If available
     "id": "player_id",
     "fullName": "Rohit Sharma",
     "captain": false,
     "keeper": false
  }
}
```

### 2.2. Standard Scorecard Object
Returned by "Match Details" endpoints (e.g., `/cbz/{id}`).

```json
{
  "innings1": {
    "inningsData": {
      "teamName": "India",
      "totalScore": "202-10 (69.2 Ov)",
      "batsmen": [
        {
          "name": "Batsman Name",
          "runs": "50",
          "balls": "40",
          "fours": "4",
          "sixes": "2",
          "strikeRate": "125.00",
          "outHow": "b Bowler"
        }
      ]
    },
    "bowlingData": [
      {
        "bowler": "Bowler Name",
        "overs": "4.0",
        "maidens": "0",
        "runs": "30",
        "wickets": "2",
        "economy": "7.50"
      }
    ],
    "fallOfWickets": ["10-1 (Name, 2.1)", "45-2 (Name, 5.4)"],
    "extrasEle": "(b 1, lb 2, w 1, nb 0, p 0)"
  },
  "innings2": { ... }, // Same structure as innings1
  "matchDetails": {
    "matchInfo": {
      "Match": "Team A vs Team B",
      "Series": "Series Name",
      "Date": "Date String",
      "Venue": "Stadium Name",
      "Toss": "Team A won toss and elected to bat",
      "Umpires": "Umpire Names"
    },
    "team1": { "teamName": "Team A", "playingList": [] },
    "team2": { "teamName": "Team B", "playingList": [] }
  }
}
```

---

## 3. Endpoints & Responses

### 3.1. General Info

#### `GET /`
Returns API meta-information.

**Response (200 OK):**
```json
{
  "status": true,
  "message": "Welcome to the API!",
  "data": {
    "name": "Cricket API",
    "version": "1.0.0",
    "document": "/docs",
    "openapi": "/openapi.json"
  }
}
```

---

### 3.2. Live Match Lists

#### `GET /cbz`
Fetches live scores from **Cricbuzz**.
*   **Response**: Map of `MatchID` -> `Standard Match Summary Object`.
*   **Key**: Numeric string (e.g., `"87911"`).

#### `GET /espn`
Fetches live scores from **ESPN Cricinfo**.
*   **Response**: Map of `MatchID` -> `Standard Match Summary Object`.
*   **Key**: Numeric string (e.g., `"1345678"`).

#### `GET /clg`
Fetches live scores from **Cricket Line Guru**.
*   **Response**: Map of `MatchID` -> `Standard Match Summary Object`.
*   **Key**: Composite string (e.g., `"clg_teamAteamB"`).

#### `GET /sk`
Fetches live scores from **Sportskeeda**.
*   **Response**: Map of `MatchID` -> `Standard Match Summary Object`.
*   **Key**: Slug string (e.g., `"ind-vs-eng-t20"`).

#### `GET /nw18`
Fetches live scores from **News18**.
*   **Response**: Map of `MatchID` -> `Standard Match Summary Object`.

**Success Response Example (Generic):**
```json
{
  "12345": {
    "match_url": "...",
    "t1": { "n": "AUS", "f": "Australia" },
    "t2": { "n": "IND", "f": "India" },
    "i1": { "sc": "250/5", "wk": "5", "ov": "50.0" },
    "i2": { "sc": "200/2", "wk": "2", "ov": "40.0" },
    "cs": { "msg": "India need 51 runs" }
  }
}
```

---

### 3.3. Match Details (Scorecards)

#### `GET /cbz/{matchId}`
#### `GET /espn/{matchId}`
#### `GET /clg/{matchId}`
#### `GET /sk/{matchId}`
#### `GET /nw18/{matchId}`

**Parameters:**
*   `matchId`: The ID returned from the corresponding list endpoint.

**Response (200 OK):**
Returns the `Standard Scorecard Object` (see section 2.2).

**Error Response (404 Not Found):**
If the scorecard is unavailable or the match ID is invalid.
```json
{
  "success": false,
  "error": "Scorecard not available for this match"
}
```
---

## 4. Error Codes & Handling

### 400 Bad Request
Occurs if invalid parameters are passed (e.g., invalid debug source).
```json
{
  "status": false,
  "error": "Invalid debug source"
}
```
*or*
```json
{
  "success": false,
  "error": "Match ID is required"
}
```

### 403 Forbidden
Occurs if restricted endpoints are accessed from non-allowed hosts.
```text
Forbidden
```

### 404 Not Found
Occurs when a route is not defined or a resource (match) is missing.
```json
{
  "status": false,
  "error": "Oops! '/invalid-route' Page Not Found!"
}
```

### 500 Internal Server Error
Occurs when scraping fails or an upstream change breaks the parser.
```json
{
  "success": false,
  "error": {
    "message": "Data source structure changed or match data unavailable",
    "code": "PARSING_FAILURE"
  }
}
```
*or generic:*
```json
{
  "success": false,
  "error": "Detailed error message..."
}
```