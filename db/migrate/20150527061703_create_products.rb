class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :cost
      t.string :brand
      t.text :description

      t.timestamps
    end
  end
end
