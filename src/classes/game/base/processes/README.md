# Processes

## Introduction

## Examples

- digestion process
  - reduces stomach content by a computed value
- health regeneration
  - regenerates health stat if `energy > 50%` and `hydration > 50%` (in other words when Hobo is healthy)

## Usage

- automatic processes extend `Process` class;

## Decorators

- Class
  - `@When` — only executes process when the condition is met. Multiple can be added
- Property
  - `@IgnoreLimits` — when mutating stat if stat value result is below minimum or above maximum, validation behavior can be tweaked to allow much mutation. 