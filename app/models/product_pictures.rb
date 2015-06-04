class ProductPictures < ActiveRecord::Base
	belongs_to :product #, dependent: :destroy
	#has_attached_file :avatar,:styles => { :medium => "300x300>" }    
	has_attached_file :avatar, :styles => 
           { :medium => "450x450>", :thumb => "100x100>" }
    do_not_validate_attachment_file_type :avatar
end
