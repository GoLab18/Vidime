# Vidime

Vidime is a video streaming website built with **Spring Boot** and **Angular**, using **MySQL** as the database.

---

## Features

### Authentication

Uses **JWT** for authentication and session management.

**Register form:**

<img width="2565" height="1275" alt="register" src="https://github.com/user-attachments/assets/b549ac4e-2607-4f89-b42f-e9917a49dce2" />

---

**Login form:**

<img width="2385" height="1254" alt="login" src="https://github.com/user-attachments/assets/eb0225e8-b88e-4f2b-93b7-30443af818ee" />

---

### Channel Creation

Users can have multiple channels attached to their account.  
When the session is established, a **channel picker window** is presented:

<img width="2243" height="1275" alt="channel_choice" src="https://github.com/user-attachments/assets/e181fe0d-f235-427a-baa9-1cbcf855f4a5" />

---

The last tile is a button for new channel creation.  
It redirects to a creation form:

<img width="2878" height="1382" alt="create_channel" src="https://github.com/user-attachments/assets/ea9cabb9-6df3-43e9-b3bb-e705187d74f0" />

---

### Home Page

From here, a user who is not signed in can access trending videos, the channels page, search functionality, and redirect to the authentication form.  
If signed in, additional features such as access to the history page and video creation are available.

![home](https://github.com/user-attachments/assets/f94de3b8-5890-4ecf-9713-6ad592da17e1)

---

**Channel options window:**

<img width="2878" height="1380" alt="home_options" src="https://github.com/user-attachments/assets/a46b1bca-46f6-49c8-8856-e222bb9e8d28" />

---

### Video Creation

Handles video creation through a form.  
A new video must have at least a title and description, with optional tags and a custom thumbnail.

<img width="2877" height="1382" alt="add_video_1" src="https://github.com/user-attachments/assets/dcf8b4a4-368b-430c-81e6-1417a443cf31" />

---

<img width="2878" height="1382" alt="add_video_2" src="https://github.com/user-attachments/assets/c462f71c-23c1-416b-8451-c51e44a1ed76" />

---

### Channel Page

Can be accessed by clicking on channel info attached to a video, playlist, and more.  
The page is interactive when the viewed channel belongs to the current user and can be updated.

It has two main views:

**Videos view:**

![channel_main](https://github.com/user-attachments/assets/bbd23d86-d344-42ac-9efc-03c9827157e5)

---

**Playlists view:**

![channel_playlists](https://github.com/user-attachments/assets/f3464a93-8ce2-4f89-9ecd-0afa862c93e6)

---

### Watch Page

The watch page includes information about the currently viewed video and a player for it.  
It has a related videos sidebar and a toggleable comments window at the bottom.

![watch](https://github.com/user-attachments/assets/f6fdcf47-4bd4-4773-902f-10bedc5a9040)

---

![watch_comments](https://github.com/user-attachments/assets/243bf35e-bbd2-4a73-a424-81f42d83bb9a)

---

### History Page

Holds the current channel's watch history.  
Each video’s info can be viewed using the expansion button at the bottom right of it's tile.

<img width="2877" height="1384" alt="watch_history_1" src="https://github.com/user-attachments/assets/b78e3592-a3ea-4fd2-a5d6-d73c7d967b53" />

---

<img width="2878" height="1384" alt="watch_history_2" src="https://github.com/user-attachments/assets/557e13ff-9313-462d-9e37-ffd84af7797b" />

---

### Channel Statistics Page

Displays channel views, subscription statistics, and top videos for the selected period.  
Statistics are plotted on charts, and the time window can be adjusted using a picker at the top of the page.

<img width="2255" height="1373" alt="stats_1" src="https://github.com/user-attachments/assets/533a4e15-b05b-4baa-b84f-ab5323cb7cd5" />

---

<img width="2294" height="1373" alt="stats_2" src="https://github.com/user-attachments/assets/915dc8de-db52-466b-aad7-da5bf33cb245" />

---

<img width="2374" height="1370" alt="stats_3" src="https://github.com/user-attachments/assets/97936284-df9f-467a-b969-864322b91ee1" />

---

## Implementation Notes

### Database Schema

The schema includes some redundant fields planned for future use.

<img width="1677" height="1439" alt="Vidime3" src="https://github.com/user-attachments/assets/eff41d23-17a2-4b09-a2e1-f8884049690b" />

---

### Statistics Calculations

Video statistics are periodically recalculated using Spring’s `@Scheduled` tasks.  
These jobs run every **10 minutes** and update three metrics: Bayesian rating, time-decayed Bayesian rating, and time-decayed views.

---

#### Bayesian Rating

A Bayesian average produces a fairer rating score by combining a video’s own average with the global mean.  
This prevents small-sample videos from being overrepresented.

Formula:

Bayesian Rating = (C * m + n * v) / (C + n)

Where:
- `v` = video’s average rating  
- `n` = number of ratings  
- `m` = global average rating  
- `C` = confidence constant (25th percentile of rating counts)

---

#### Time-Decayed Bayesian Rating

This variant emphasizes recent ratings.  
Each rating is weighted by an exponential decay function with a 7-day half-life:

weight = e^(-λ * age_in_days), λ = ln(2) / 7

Older ratings lose influence over time, allowing current engagement to affect rankings more strongly.

---

#### Time-Decayed Views

Views are also adjusted using exponential decay, producing a momentum-based “trending” metric that reflects recent viewer activity.

---

#### Scheduling and Batch Processing

All updates are processed in **batches of 100 videos** to reduce database overhead.  
The following scheduled tasks handle the updates:

| Task | Method | Description |
|------|---------|-------------|
| `periodicBayesianRatingUpdate()` | `updateBayesianRatings()` | Updates Bayesian ratings |
| `periodicTimeDecayedBayesianRatingUpdate()` | `updateTimeDecayedBayesianRatings()` | Updates time-decayed Bayesian ratings |
| `periodicDecayedViewsUpdate()` | `updateDecayedViews()` | Updates time-decayed view counts |

### Features Left to Add

#### Core Functionality
- full video comments implementation
- playlist creation and video ordering management
- featured content support for channels
- playlist statistics and a playlist management window

#### User Experience
- password recovery flow ("Forgot password")
- third-party sign-up options (Google, GitHub, etc.)
- channel link positioning option
- personalized home page suggestions based on viewing history

#### Infrastructure
- custom CDN for serving videos and thumbnails
