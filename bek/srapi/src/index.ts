// import type { Core } from '@strapi/strapi';

import {Core} from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      async beforeCreate(event) {
        const { data } = event.params;
        if(data.priceRub && !data.priceTen) {
          data.priceTen = data.priceRub * 6.43
        } else if (!data.priceRub && data.priceTen) {
          data.priceRub = data.priceTen * 0.16
        }
      },

      async beforeUpdate(event) {
        const { data } = event.params;
        if(data.priceRub && !data.priceTen) {
          data.priceTen = data.priceRub * 6.43
        } else if (!data.priceRub && data.priceTen) {
          data.priceRub = data.priceTen * 0.16
        }
      },
    });
  },
};
