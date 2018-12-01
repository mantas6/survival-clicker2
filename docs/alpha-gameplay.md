# Content for alpha

*Info: All listed costs do not include tax*

## Modifiers
- concentration

## Drugs

- coffee
  - `-1` money
  - `5` energy
  - `-0.1` energy for `50` duration
  - `3` stomach
- energy drink
  - `-2` money
  - `3` restoreStamina for `5` duration
  - `2` stomach
- cheap stimulant
  - `-10` money
  - `-0.1` energy for `60` duration
  - `5` staminaRestoreSpeed for `5` duration
  - `2` stomach
- modafinil
  - `-25` money
  - `0.1` concentration for `5` duration
  - `1` stomach
- speed
  - `-50` money
  - `-0.1` health for `30` duration
  - `1` concentration for `10` duration
  - `5` staminaRestoreSpeed for `5` duration
  - `1` stomach

## Education

### Primary
- school (cost: `50 * 1.5^timeBought`)
  - 1 stage
    - unlocks **drivers license** course
    - unlocks **blood test** course
    - unlocks **medicine lecture** course
  - 2 stage
    - unlocks **mineral-water** and **hamburger** consumables
  - 3 stage
    - unlocks **secondary** education purchases

### Courses
- drivers license (cost: `200`)
  - unlocks **pizza delivery** job
    - `15` money
    - `-3` stamina
- blood test (cost: `50`)
  - unlocks **selling blood** job
    - `100 * healthLevel` money
    - `-30` health
- medicine lecture (cost: `50`)
  - unlocks **syrup of ipecac** drug
  - unlocks **digestion pills** drug

### Secondary
- information technology (cost: `150 * 2^timeBought`)
  - 1 stage
    - unlocks **craft a janky website** job
      - `20` money
      - `-5 / concentration` energy
  - 2 stage
    - doubles payout for **craft a janky website**
    - unlocks **create an unfair lottery website** investment
      - `-1000 * 5^timesBought` money
      - `-10 / concentration` energy
      - `1/s` money
  - 3 stage
    - locks **craft a janky website**
    - unlocks **craft a responsive website** job
      - `100` money
      - `-5 / concentration` energy
  - 4 stage
    - unlocks **develop a react app**
      - `300` money
      - `-30 / concentration` energy
    - doubles payout for **craft a responsive website**
    - unlocks **rerent a linux server** investment
      - `-2000 * 1.5^timesBought` money
      - `-20 / concentration` energy
      - `2/s` money
  - 5 stage
    - unlocks **create a trans dating network**
      - `-5000 * 1.25^timesBought` money
      - `-50 / concentration` energy
      - `5/s` money

- construction (cost: `100 * 1.5^timeBought`)
  - 1 stage
    - unlocks **carry red bricks** job
      - `20` money
      - `-10` stamina
  - 2 stage
    - unlocks **build house foundation** job
      - `50` money
      - `-20` stamina
  - 3 stage
    - unlocks **steal equipment** job
      - `100` money
      - `-30` stamina
  - 4 stage
  - 5 stage