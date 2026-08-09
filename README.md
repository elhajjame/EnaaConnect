# EnaaConnect

**EnaaConnect** is a web platform designed to improve communication and collaboration among students. It provides a centralized environment where students can interact, organize events, join clubs, exchange messages, and share information — replacing scattered communication across multiple social media apps with one secure, user-friendly system.

> Prepared for: Projet fil rouge Project
> Author: Mehdi El Hajjame
> Version: 1.0

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
- [User Roles](#user-roles)
- [Database Design](#database-design)
- [User Stories](#user-stories)
- [Non-Functional Requirements](#non-functional-requirements)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

---

## About the Project

Enaa school organizes many activities throughout the academic year, but students often miss important announcements because information is spread across different platforms. **EnaaConnect** brings communication, events, clubs, and messaging together into a single centralized platform.

## Problem Statement

- **Communication problems** — announcements scattered across multiple channels
- **Collaboration difficulties** — no unified space for students to work together
- **Limited club visibility** — clubs lack a dedicated space to reach members
- **Event organization challenges** — no structured way to plan and manage events
- **Lack of community** — students have limited ways to connect around shared interests

## Objectives

- Improve communication across the school
- Simplify event management
- Promote student clubs
- Support academic collaboration
- Increase student engagement

## Features

### 🔐 User Registration & Authentication
Account creation, secure login/logout, password reset, and email verification.

### 👤 Profile Management
Personal profiles with academic background, interests, and profile picture — helping students discover classmates with shared interests.

### 📰 Student Feed
Publish, edit, delete, like, and comment on posts. Supports text, images, questions, and announcements.

### 📅 Event Management
Create, join, leave, comment on, and share events across categories such as Education, Sports, Workshops, Culture, Entertainment, and Trips.

### 🏛️ Clubs & Communities
Create and join clubs, manage members, and publish club announcements.

### 💬 Messaging System
Private and group conversations with file and document sharing.

### 🧳 Trip Planning
Organize educational or recreational trips with destination, date, budget, and available seats; chat with trip participants.

### 🔔 Notification System
Real-time alerts for likes, comments, messages, club joins, and event activity.

### 🔍 Search Functionality
Search across students, events, and clubs.

### 🛠️ Administration Panel
Manage user accounts, moderate reported content, approve/reject events, manage clubs, and remove inappropriate content.

## User Roles

| Role | Description |
|------|-------------|
| **Student** | Registers, builds a profile, posts, joins events/clubs, messages other students, and plans trips |
| **Club Leader** | Manages club members and publishes club announcements |
| **Administrator** | Oversees the platform: manages accounts, moderates content, and approves events |

## Database Design

EnaaConnect uses **MongoDB**, chosen for its flexibility, scalability, and ability to efficiently handle structured and semi-structured data. Each collection represents a core entity in the system.

| Collection | Fields |
|------------|--------|
| **Users** | User ID, Full Name, Email, Password, Profile Picture, Biography, Field of Study, Academic Year, Interests, Role, Account Creation Date |
| **Posts** | Post ID, Author ID, Content, Image (optional), Number of Likes, Comments, Creation Date |
| **Comments** | Comment ID, Post ID, User ID, Comment Content, Creation Date |
| **Events** | Event ID, Title, Description, Date, Time, Location, Category, Maximum Participants, Organizer ID |
| **Clubs** | Club ID, Club Name, Description, Club Image, Leader ID, Members, Creation Date |
| **Messages** | Message ID, Sender ID, Receiver ID, Message Content, Attachment (optional), Sent Date |
| **Notifications** | Notification ID, User ID, Notification Type, Message, Read Status, Creation Date |

## User Stories

<details>
<summary>Click to expand the full list of user stories</summary>

| ID | User Story |
|----|------------|
| US-01 | As a student, I want to create an account so that I can access the platform |
| US-02 | As a student, I want to log in securely so that I can access my personal dashboard |
| US-03 | As a student, I want to reset my password so that I can regain access if I forget it |
| US-04 | As a student, I want to edit my profile so that other students can know more about me |
| US-05 | As a student, I want to upload a profile picture so that my profile is personalized |
| US-06 | As a student, I want to publish posts so that I can share information and updates with other students |
| US-07 | As a student, I want to like and comment on posts so that I can interact with the community |
| US-08 | As a student, I want to delete or edit my own posts so that I can keep my content up to date |
| US-09 | As a student, I want to search for students, clubs, and events so that I can quickly find what I need |
| US-10 | As a student, I want to send private messages so that I can communicate directly with other students |
| US-11 | As a student, I want to create an event so that I can invite others to participate |
| US-12 | As a student, I want to join or leave an event so that I can manage my participation |
| US-13 | As a student, I want to create or join a club so that I can connect with people who share my interests |
| US-14 | As a student, I want to organize trips so that I can plan activities with other students |
| US-15 | As a student, I want to receive notifications so that I never miss important updates |
| US-16 | As a club leader, I want to manage club members so that I can organize the club efficiently |
| US-17 | As a club leader, I want to publish announcements so that all club members stay informed |
| US-18 | As an administrator, I want to manage user accounts so that the platform remains organized and secure |
| US-19 | As an administrator, I want to approve or reject events so that only appropriate events are published |

</details>

## Non-Functional Requirements

- **Performance** — responsive interactions across all core features
- **Reliability** — consistent uptime and stable data handling
- **Usability** — intuitive, student-friendly interface
- **Compatibility** — accessible across common browsers and devices

For full details, refer to the [Software Requirements Specification](./EnaaConnect_SRS.pdf).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Token) |
| Real-Time Communication | Socket.io |

---

<p align="center">Made with 🎓 for a more connected school community.</p>
