
exports.up =  async  (knex) =>{
    await knex.schema.createTable('user_like_pet', (table)=>{

      table.increments().notNullable();

     table.integer('pet_id').unsigned().references('id').inTable('pets');
     table.integer('user_id').unsigned().references('id').inTable('users');
    })
  };
  
  exports.down = async  (knex) => {
    await knex.schema.droTable('user_like_pet');
  };
//   .inTable('pets');