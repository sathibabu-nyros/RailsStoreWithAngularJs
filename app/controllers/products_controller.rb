class ProductsController < ApplicationController

  respond_to :html, :json

  def index
    @products = Product.order("avgrate DESC")
    @products = Product.order("avgrate DESC").paginate(:page => params[:page], :per_page => 6) if params[:page].present?
     if params[:page].present?
     @products.each do |product|
      image = ProductPictures.where(:product_id => product.id).first
      product[:avatar_content_type] = image.avatar.url(:medium) if image.present?
    end
    end
    respond_with(@products) do |format|
      format.json { render :json => @products.as_json }
      format.html
    end
  end

  def create
    @product = Product.new(product_params)
    if @product.save

      render json: @product.as_json, status: :ok
    else
      render json: {product: @product.errors, status: :no_content}
    end
  end

  def show
    @product = Product.find(params[:id])
  #@product[:avatar_content_type] = @product.avatar.url(:medium)
    #@product[:avatar_file_name] = @product.avatar.url
   # respond_with(@product.as_json)
    respond_with(@product.as_json)
  end




    def getproductimages
      @product = Product.find(params[:id])
      length = ProductPictures.where(:product_id => @product.id).count
      images = ProductPictures.where(:product_id => @product.id)
      data = Hash.new;

        images.each do |image|
          data[image.id] =  Hash.new;
          data[image.id][:id] =  image.id
          data[image.id][:thumb] =  image.avatar.url(:medium)
          data[image.id][:medium] =  image.avatar.url(:medium)
          data[image.id][:original] =  image.avatar.url
        end
     render json: data.as_json, status: :ok
      #respond_with(data.as_json), status: :ok

    end





  def update
  	@product = Product.find(params[:id])
    if @product.update_attributes(product_params)
      render json: @product.as_json, status: :ok
    else
      render json: {product: @product.errors, status: :unprocessable_entity}
    end
  end

  def destroy
  	@product = Product.find(params[:id])
    images = ProductPictures.where(:product_id => @product.id)
    if @product.destroy
      images.each do |image|
        @image = ProductPictures.find_by_id(image.id)
        @image.destroy if @image
      end
   end
    render json: {status: :ok}
  end

  def upload_images
    @product = Product.find(params[:id])
    product_picture = ProductPictures.create(:avatar => params[:product][:avatar])
    product_picture[:product_id] = @product.id
    product_picture.save
    render json: {status: :ok}
  end

  def delimage
    @image = ProductPictures.find_by_id(params[:id])
    @image.destroy if @image
    render json: {status: :ok}
  end

 private

  def product_params
    params.fetch(:product, {}).permit(:name, :cost, :brand, :description, :avatar, :ModelName, :SIM, :TouchScreen, :VideoPlayer, :PrimaryCamera, :Bluetooth, :USBConnectivity, :Weight, :Dimension, :Battery, :Memory, :OS, :Processor, :Warranty, :Wifi, :SecondaryCamera, :HandsetColor)
  end



  def get_product
    @product = Product.find(params[:id])
    render json: {status: :not_found} unless @product
  end



end
