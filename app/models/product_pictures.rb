class ProductPictures < ActiveRecord::Base
	belongs_to :product
	#has_attached_file :avatar,:styles => { :medium => "300x300>" }    
	has_attached_file :avatar, :styles => 
           { :medium => "900x900>", :thumb => "300x300>" }
    do_not_validate_attachment_file_type :avatar
end
