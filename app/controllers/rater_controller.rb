class RaterController < ApplicationController
  after_action :update_avgrate, only: [:create]
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

  def update_avgrate
    product = Product.find(params[:id])
    @avgrate = RatingCache.find_by_cacheable_id(params[:id])
    product[:avgrate] = @avgrate.avg if @avgrate.present?
    product.save
  end

end
