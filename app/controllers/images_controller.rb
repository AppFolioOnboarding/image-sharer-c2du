class ImagesController < ApplicationController
  def new
    @image = Image.new
  end

  def show
    @image = Image.find(params[:id])
  end

  def create
    @image = Image.new(image_params)

    if @image.save
      redirect_to @image, notice: 'Image was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def index
    @images = Image.all.order(created_at: :desc)
  end

  # def tagged
  #   @images = params[:tag].present? ? Image.tagged_with(params[:tag]) : Image.all.order(created_at: :desc)
  #   redirect_to index
  # end

  private

  def image_params
    params.require(:image).permit(:url, :tag_list)
  end
end
