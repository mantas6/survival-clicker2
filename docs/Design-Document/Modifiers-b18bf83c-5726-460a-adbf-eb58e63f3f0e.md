# Modifiers

# Outline

- modifier (MD) defines a base or final value for any stat in the game; can be used in both modules and base game mechanics
- MD is calculated during runtime
- has configurable default value (e.g.: `1`)
- can be namespaced using dot notation (e.g.: `character.health.maximum`)
- can be modified by multiplication or addition using [Effects](https://www.notion.so/ffab63a0-653c-4b43-8715-495b60659dcc)

# Examples

- MD with name of `character.health.maximum` with the starting value of `100`; defines maximum health of Hobo; if character has an effect active that increases this MD by `1.5x`, then maximum health becomes `150`