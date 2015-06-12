class AddFieldsToProduct < ActiveRecord::Migration
  def change
    add_column :products, :HandsetColor, :string
    add_column :products, :SIM, :string
    add_column :products, :ModelName, :string
    add_column :products, :TouchScreen , :boolean
    add_column :products, :VideoPlayer, :boolean
    add_column :products, :MusicPlayer, :boolean
    add_column :products, :PrimaryCamera, :string
    add_column :products, :SecondaryCamera, :string
    add_column :products, :Bluetooth, :string
    add_column :products, :Wifi, :string
    add_column :products, :USBConnectivity, :string
    add_column :products, :Weight, :string
    add_column :products, :Dimension, :string
    add_column :products, :Size, :string
    add_column :products, :Battery, :string
    add_column :products, :ExpandableMemory , :string
    add_column :products, :Memory, :string
    add_column :products, :Internal, :string
    add_column :products, :OS, :string
    add_column :products, :Processor, :string
    add_column :products, :OtherFeature, :string
    add_column :products, :Warranty, :string
  end
end
