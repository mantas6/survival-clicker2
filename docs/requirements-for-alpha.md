# Requirements for Alpha release

This is a list of features that need to be implemented for the game to be considered as alpha. List will be appended to if some features are found out to be missing, also the implemented ones will be marked as done.

- suicide functionality
  - resets game progress
- state saving
  - serializes game for storage
  - saves to `localStorage`
  - reloads from `localStorage`
- death functionality
  - health decreases when needs are not met
  - when health goes to zero, game resets
- translations
  - all the items and text are translated though a global translation helper
- more dynamic stat logic
  - stats to support value going over 1 and below 0, when it does a special callback is triggered. Used for handling:
    - *stomach overfilling*
    - *no stamina penalty*
- minimal game content
  - have a content for at least 10-30min of game-play time
- dynamic time calculation
  - every calculation function should have a parameter for how much time has passed. Could also be reused for *BUY X* functionality
- node iterators
  - make iterators more consistent i.e., all to return an object with node itself + property name or descriptor