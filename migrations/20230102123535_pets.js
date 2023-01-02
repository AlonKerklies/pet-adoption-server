
exports.up = function(knex) {
  return knex.schema.createTable('pets', (table)=>{
    table.increments('id').primary();
    table.string('type').notNull();
    table.string('name').notNull();
    table.string('adoptionStatus').notNull();

    table.timestamp('dateCreated').defaultTo(knex.fn.now());

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