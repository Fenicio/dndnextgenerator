dndnextgenerator
================

Monster/Dungeon/Encounter/Campaign/Whatever generator/crowd based for Dungeons and Dragons 5E


Currently deployed at dndgen.meteor.com


A Type is something an attribute that defines another element(creatures, locations, traps, dungeons...), 
such as flying, aquatic, goblinoid, huge, regenerative and anything else.

Types come in three varieties:
    "main": The base template, something like humanoid, spider, ooze, lizard, bird, fish...
    "size": The classical six: Tiny, Small, Medium, Large, Huge, Gargantuan
    "sub": The fun part, anything goes here, acid-breathing, hydra-headed, goblinoid, brutish

A creature is generated by getting random traits and calculation the correct numbers and then generating a fun name.
Creatures can/should have pictures accompaying them as well as a written description/history, therefore the social aspect of this, users should be allowed to draw Flying asslings.


TODOS:
Must show validation errors.
Must make sure size types are not modificable.
Must show some monsters.
An encounter is a bunch of creatures who share a common trait and fill a Challenge Rating, a encounter can also be based in a location.
An element is a building or furniture that appears on dungeons, it can hold treasure and/or host a puzzle/trap. 
  Note: Maybe they shouldn't be a collection, maybe the "dungeon theme" should be a collection containing elements, jurmm..
A trap is something that is found in dungeons and eats tasty adventurers.
A dungeon is a location that holds encounters, doors, puzzles and traps.
A campaign is a bunch of dungeons, encounters and locations sew together under the pretense of "plot". Plot is deprecated in dnd.