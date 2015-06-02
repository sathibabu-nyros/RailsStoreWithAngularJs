class ProductsController < ApplicationController
	
  respond_to :html, :json

  def index
    @products = Product.all   
    @products = Product.paginate(:page => params[:page], :per_page => 5) if params[:page].present?
     @products.each do |product|
      product[:avatar_content_type] = product.avatar.url(:medium)     
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
    @product[:avatar_content_type] = @product.avatar.url(:thumb)
    @product[:avatar_file_name] = @product.avatar.url
    respond_with(@product.as_json)
  end

  def update
  	@product = Product.find(params[:id])
    @product[:avatar_content_type] = @product.avatar.url(:thumb)
    @product[:avatar_file_name] = @product.avatar.url
    if @product.update_attributes(product_params)
      render json: @product.as_json, status: :ok 
    else
      render json: {product: @product.errors, status: :unprocessable_entity}
    end
  end

  def destroy
  	@product = Product.find(params[:id])
    @product.destroy
    render json: {status: :ok}
  end

 private

  def product_params
   
    params.fetch(:product, {}).permit(:name, :cost, :brand, :description, :avatar)
  end

  def get_product
    @product = Product.find(params[:id])
    render json: {status: :not_found} unless @product
  end

 

end
