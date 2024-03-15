import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  quotas: defineTable({
    identifier: v.string(),
    last_reset_date: v.number(),
    queryLimit: v.number(),
  }).index('by_identifier', ['identifier']),
  userSettings: defineTable({
    identifier: v.string(),
    numberOfRecipes: v.number(),
    diet: v.array(v.string()),
    intolerances: v.array(v.string()),
    isSubscribed: v.boolean(),
  }).index('by_identifier', ['identifier']),
  shoppingLists: defineTable({
    identifier: v.string(),
    mealPlanId: v.id('mealPlans'),
    list: v.any(),
  }).index('by_identifier_and_mealPlanId', ['identifier', 'mealPlanId']),
  mealPlans: defineTable({
    identifier: v.string(),
    recipes: v.array(
      v.object({
        aggregateLikes: v.float64(),
        likes: v.optional(v.number()),
        license: v.optional(v.string()),
        spoonacularSourceUrl: v.optional(v.string()),
        missedIngredientCount: v.optional(v.number()),
        missedIngredients: v.optional(v.array(v.any())),
        usedIngredientCount: v.optional(v.number()),
        usedIngredients: v.optional(v.array(v.any())),
        unusedIngredients: v.optional(v.array(v.any())),
        extendedIngredients: v.array(
          v.object({
            aisle: v.optional(v.union(v.string(), v.null())),
            amount: v.number(),
            consistency: v.string(),
            id: v.number(),
            name: v.string(),
            nameClean: v.string(),
            image: v.string(),
            measures: v.object({
              metric: v.optional(
                v.object({
                  amount: v.number(),
                  unitLong: v.string(),
                  unitShort: v.string(),
                }),
              ),
              us: v.optional(
                v.object({
                  amount: v.number(),
                  unitLong: v.string(),
                  unitShort: v.string(),
                }),
              ),
            }),
            meta: v.array(v.any()),
            original: v.string(),
            originalName: v.string(),
            unit: v.string(),
          }),
        ),
        analyzedInstructions: v.array(
          v.object({
            name: v.string(),
            steps: v.array(
              v.object({
                equipment: v.array(
                  v.object({
                    id: v.float64(),
                    image: v.string(),
                    localizedName: v.string(),
                    name: v.string(),
                    temperature: v.optional(
                      v.object({
                        number: v.float64(),
                        unit: v.string(),
                      }),
                    ),
                  }),
                ),
                ingredients: v.array(
                  v.object({
                    id: v.float64(),
                    image: v.string(),
                    localizedName: v.string(),
                    name: v.string(),
                  }),
                ),
                length: v.optional(
                  v.object({
                    number: v.float64(),
                    unit: v.string(),
                  }),
                ),
                number: v.float64(),
                step: v.string(),
              }),
            ),
          }),
        ),
        cheap: v.boolean(),
        cookingMinutes: v.float64(),
        creditsText: v.string(),
        cuisines: v.array(v.string()),
        dairyFree: v.boolean(),
        diets: v.array(v.string()),
        dishTypes: v.array(v.string()),
        gaps: v.string(),
        glutenFree: v.boolean(),
        healthScore: v.float64(),
        id: v.float64(),
        image: v.string(),
        imageType: v.string(),
        locked: v.optional(v.boolean()),
        lowFodmap: v.boolean(),
        occasions: v.array(v.string()),
        preparationMinutes: v.float64(),
        pricePerServing: v.float64(),
        readyInMinutes: v.float64(),
        servings: v.float64(),
        sourceName: v.string(),
        sourceUrl: v.string(),
        spoonacularScore: v.float64(),
        summary: v.string(),
        sustainable: v.boolean(),
        title: v.string(),
        vegan: v.boolean(),
        vegetarian: v.boolean(),
        veryHealthy: v.boolean(),
        veryPopular: v.boolean(),
        weightWatcherSmartPoints: v.float64(),
      }),
    ),
    startDate: v.number(),
  }).index('by_identifier', ['identifier']),
})
