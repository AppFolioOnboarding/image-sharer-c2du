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
    @images = if params[:tag].present?
                Image.tagged_with(params[:tag])
              else
                Image.all
              end
    @images = @images.order(created_at: :desc)
  end

  def destroy
    @image = Image.find_by(id: params[:id])
    if @image.present?
      @image.destroy!
      msg = 'Image was successfully deleted.'
    else
      msg = 'Image not found.'
    end
    redirect_to images_path, notice: msg
  end

  private

  def image_params
    params.require(:image).permit(:url, :tag_list)
  end
end
