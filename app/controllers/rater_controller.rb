class RaterController < ApplicationController
  after_action :update_avgrate,:post_review, only: [:create]
  def create
    if user_signed_in?
      obj = params[:klass].classify.constantize.find(params[:id])
      obj.rate params[:score].to_f, current_user, params[:dimension]

      render :json => true
    else
      render :json => false
    end
  end

  def getuser_rate
  	 @userrate = Rate.where(:rater_id =>params[:rater_id],:rateable_id =>params[:rateable_id])
    if @userrate
      render json: @userrate.as_json, status: :ok
    else
      render :json => false
    end
  end

  def get_reviews
    @reviews = Review.where(:product_id => params[:id]).limit(6).order("id DESC");
    if @reviews
      render json: @reviews.as_json(include: { user: { only: :email}, product: { only: :avgrate} },
                                                only: [:review,:created_at,:id]), status: :ok
    else
      render :json => false
    end
  end


  def get_allreviews
    @reviews = Review.where(:product_id => params[:id]).order("id DESC").paginate(:page => params[:page], :per_page => 6);
    if @reviews
      render json: @reviews.as_json(include: { user: { only: :email}, product: { only: :avgrate} },
                                                only: [:review,:created_at,:id]), status: :ok
    else
      render :json => false
    end
  end



  private

  def update_avgrate
    if user_signed_in?
      product = Product.find(params[:id])
      @avgrate = RatingCache.find_by_cacheable_id(params[:id])
      product[:avgrate] = @avgrate.avg if @avgrate.present?
      product.save
    end
  end

  def post_review
    if user_signed_in?
      @review = Review.new
      @review[:product_id] = params[:id]
      @review[:user_id] = current_user.id
      @review[:review] = params[:review]
      @review.save
    end
  end

end
