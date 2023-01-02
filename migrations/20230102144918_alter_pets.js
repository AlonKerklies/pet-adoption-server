
exports.up = function(knex) {
    return knex.schema.alterTable('pets', (table)=>{
        table.integer('pppppp');
      table.renameColumn('name', 'petname');
 
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.droTable('pets');
  };
  
  // /**
  //  * @param { import("knex").Knex } knex
  //  * @returns { Promise<void> }
  //  *//**
  //  * @param { import("knex").Knex } knex
  //  * @returns { Promise<void> }
  //  */