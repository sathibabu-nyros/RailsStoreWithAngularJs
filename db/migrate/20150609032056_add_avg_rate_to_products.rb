class AddAvgRateToProducts < ActiveRecord::Migration
  def change
    add_column :products, :avgrate, :float, :default => 1
  end
end
