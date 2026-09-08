export const BUILDING_NAMES = {
  TOWNHALL: "Townhall",
  HOUSE: "House",
  SAWMILL: "Sawmill",
  HUNTERHUT: "Hunter's Hut",
  BUILDERHUT: "Builder's Hut",
}

export const BUILDING_CONFIGS = {
  [BUILDING_NAMES.TOWNHALL]: {
    name: 'Townhall',
    color: 'bg-blue-400 hover:bg-blue-600',
    dialogName: 'townhall'
  },
  [BUILDING_NAMES.HOUSE]: {
    name: 'House',
    cost: { gold: 100 },
    capacity: 5,
    color: 'bg-yellow-400 hover:bg-yellow-600'
  },
  [BUILDING_NAMES.SAWMILL]: {
    name: 'Sawmill',
    cost: { gold: 250 },
    production: { resource: 'wood', ratePerSec: 5 },
    color: 'bg-amber-600 hover:bg-amber-800'
  },
  [BUILDING_NAMES.HUNTERHUT]: {
    name: "Hunter's hut",
    cost: { gold: 250 },
    production: { resource: 'meat', ratePerSec: 5 },
    color: 'bg-red-400 hover:bg-red-600'
  },
  [BUILDING_NAMES.BUILDERHUT]: {
    name: 'Builder hut',
    cost: { gold: 400 },
    capacity: 1,
    color: 'bg-green-400 hover:bg-green-600'
  }
} as const;