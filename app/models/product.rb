class Product < ActiveRecord::Base
	has_many :product_pictures
	accepts_nested_attributes_for :product_pictures, :reject_if => lambda { |t| t['product_pictures'].nil? }
end
