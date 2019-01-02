# survival-clicker2

[![Build Status](https://travis-ci.com/MantasPauliukonis/survival-clicker2.svg?branch=master)](https://travis-ci.com/MantasPauliukonis/survival-clicker2)

## Releases

The latest stable release is [available here](https://sc2.7777.lt).

## Intro

The original *Survival Clicker* was inspired by the survival/crafting video game genre. Although crafting mechanics never made sense to be in the game (obvious reasons). Rather it was meant to highlight the struggle of survival, the feeling that player gets when he just barely makes thought the harsh stages, the immersive experience the player has while simultaneously growing in with the in-game character.

*Survival Clicker* was developed spontaneously during a very short period of time, a few stability updates were released and not much development was seen past that, making it stuck in a prototype stage forever. The implementation simply did not allow any further expansion without a rewrite.

Certain things have come in to an alignment making now -- the perfect time to revisit this concept and possibly make it into a more fully fledged experience. This is where the *Survival Clicker 2* starts. Explore [the design document](docs/Design-Document/Design-Document-e000f04c-b05b-4dfc-83b0-3770f478d276.md) to get your whereabouts.

To turn this project into something at least half decent I need your help. Contact me on:
[Reddit](https://www.reddit.com/user/mantas6)
or
[Discord](https://discord.gg/DMXvm7W)

## Development progress

The base functionality is currently being implemented for the game. Once it's done, game will be tagged as `0.1` alpha. Then further implementations can begin. *See:* [Modules](docs/Design-Document/Modules-c911879c-ec8c-4106-86d0-a8b9468d5bb8.md).

You can find the whole design document [here](docs/Design-Document/Design-Document-e000f04c-b05b-4dfc-83b0-3770f478d276.md).

## Development releases

Want to test out latest features?

The most up-to-date and unstable release (master) is [available here](https://dev.sc2.7777.lt)

**Warning:** due to constantly rolling changes save games might or will get corrupted, so do not rely on this branch for a long term play.

## Development

Project uses `vue-cli` tooling. Learn more [here](https://cli.vuejs.org/guide/#cli).

#### Project setup
```
npm ci
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Runs linter
```
npm run lint
```

#### Runs tests
```
npm run test:src

npm run test:e2e
```
