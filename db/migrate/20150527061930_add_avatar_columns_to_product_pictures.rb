class AddAvatarColumnsToProductPictures < ActiveRecord::Migration
  def self.up
    add_attachment :product_pictures, :avatar
  end

  def self.down
    remove_attachment :product_pictures, :avatar
  end
end
