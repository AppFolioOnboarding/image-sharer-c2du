require 'test_helper'
class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get root_path
    assert_response :ok
    assert_select 'h1', 'Images'
  end

  test 'should get new' do
    get new_image_path
    assert_response :ok
    assert_select 'h1', 'New Image'
    assert_select 'input'
  end

  test 'should create valid' do
    assert_difference 'Image.count', 1 do
      post images_path, params: { image: { url: 'https://pbs.twimg.com/media/CVEWaK5UwAAUYOC.jpg' } }
    end
    assert_redirected_to image_path(Image.last)
  end

  test 'should create invalid' do
    assert_no_difference 'Image.count' do
      post images_path, params: { image: { url: 'asdasdf' } }
    end
    assert_response :unprocessable_entity
  end

  test 'should get show' do
    image = Image.create!(url: 'http://www.fake.com/1.jpg')
    get image_path(image)
    assert_response :ok
    assert_select 'img[src="http://www.fake.com/1.jpg"]'
  end
end
