
exports.up =  async  (knex) =>{
  await knex.schema.createTable('pets', (table)=>{
    table.increments('id').primary();
    table.string('type').notNull();
    table.string('name').notNull();
    table.string('breed');
    table.string('color');
    table.string('height');
    table.string('weight');
    table.string('bio');
    table.string('hypoallergnic');
    table.string('adoptionStatus');
    table.string('dietaryRestrictions');
    table.string('currentOwnedByUserID');
    // table.string('userId');
    table.string('imageUrl');
    
    table.timestamp('dateCreated').defaultTo(knex.fn.now());

  })
};

 
exports.down = async  (knex) => {
  await knex.schema.dropTable('pets');
};
 