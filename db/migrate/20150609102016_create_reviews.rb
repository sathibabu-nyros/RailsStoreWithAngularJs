class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :product
      t.references :user
      t.text :review
      t.timestamps
    end
  end
end
