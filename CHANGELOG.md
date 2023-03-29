# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Dates are formatted in YYMMDD format. Each major version has a codename, this is noted with brackets beside the version number.

## [1.0.0] - Mar 29, 2023

### Changed

- Changed text for saving values in settings
- Updated README

## [0.9.0] - Feb 3, 2023

### Added

- Use AsyncStorage to store and retrieve user data (student name and id number) locally
- Add dynamic barcode generation to the profile screen
- Update settings page

### Changed

- Update dependencies
- Change theme colors

### Fixed

- Flickering bug when moving from home screen to calendar screen

## [0.8.0] - Jan 22, 2023

### Added

- Add "View on Google Calendar" button to the event info

### Changed

- Format time from _YYYY-MM-DDT00:00:00_ to _YYYY/MM/DD 00:00 PM/AM_ on the Home and Post screens
- Get the current date and use it in the api request for the events

## [0.7.0] - Jan 19, 2023

### Added

- Build event screen

### Changed

- Activity indicator size from large to small
- Rename screen names for screen stacks

## [0.6.0] - Jan 19, 2023

### Added

- Build calendar screen
- Fetch calendar events from Google Calendar
- Refresh calendar events (pull-to-refresh)
- Refresh posts (pull-to-refresh)

### Fixed

- Unicode characters showing up in post title text

## [0.5.3] - Jan 14, 2023

### Added

- Get more posts when user scrolls to the bottom of the screen

### Fixed

- Unicode characters showing up in home screen title text

## [0.5.2] - Jan 5, 2023

### Added

- Add splash screen and custom icon [Note: still need Android icon - adaptive icon]

## [0.5.1] - Jan 5, 2023

### Added

- Add device data to settings page

## [0.5.0] - Jan 3, 2023

### Added

- Built and design profile (card) screen

## [0.4.0] - Jan 2, 2023

### Added

- Built and design profile (card) screen [Note: Dynamic barcode generation not implemented yet - placeholder shown]

## [0.3.0] - Dec 30, 2022

### Added

- Set up bottom tab bar

## [0.2.0] - Dec 27, 2022

### Added

- Implement data fetching and make content dynamically updated in the home screen

## [0.1.0] - Dec 27, 2022

### Added

- Set up header section
- Build and design home screen

## [0.0.0] (Shinji) - Dec 24, 2022

### Added

- Intialize project
