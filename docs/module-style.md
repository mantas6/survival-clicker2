# Module Style Configuration

## Intro
Current configuration is loose and inconsistent since every type of node is put into a separate folder (*actions, modifiers, stats*) and etc. While it does make sense initially to have different types separated, however this not how configuration makes sense when read.
Normally grouped items should be of a logical type (i.e., *school*) then containing all system types that relate to that. This does interfere with the current uniformity, however it can be dealt with.

## Breaking changes
- front-end navigation and action view needs to be rewritten

## Implementation
- when serializing for the front end, things like stats, actions should flattened (at least to some extent)
  - i.e., stat container needs to used (like `ProcessContainer`)

## Examples
- education
  - school
    - actions
      - ...
    - level (modifier)
- character
  - body
    - stats
      - ...
    - processes
     - ...