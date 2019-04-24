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
    assert_select 'input[name="image[url]"]'
    assert_select 'input[name="image[tag_list]"]'
  end

  test 'should create valid' do
    assert_difference 'Image.count', 1 do
      post images_path, params: { image: { url: 'https://pbs.twimg.com/media/CVEWaK5UwAAUYOC.jpg',
                                           tag_list: 'happy, sad' } }
    end
    assert_equal Image.last.tag_list, %w[happy sad]
    assert_redirected_to image_path(Image.last)
  end

  test 'should create invalid' do
    assert_no_difference -> { Image.count } do
      post images_path, params: { image: { url: 'asdasdf' } }
    end
    assert_response :unprocessable_entity
  end

  test 'should get show with tags' do
    image = Image.create!(url: 'http://www.fake.com/1.jpg', tag_list: 'pig, dog')
    get image_path(image)
    assert_response :ok
    assert_select 'img[src="http://www.fake.com/1.jpg"]'
    assert_select 'span.js-tag', 'pig'
    assert_select 'span.js-tag', 'dog'
  end

  test 'add new img should show on homepage' do
    Image.create!(url: 'http://www.fake.com/2.jpg', tag_list: 'pig, dog')
    get root_path
    assert_select 'img[src="http://www.fake.com/2.jpg"]'
    assert_select 'span.js-tag', 'pig'
    assert_select 'span.js-tag', 'dog'
  end

  test 'newest img appears first' do
    Image.create!(url: 'http://www.fake.com/1.jpg')
    Image.create!(url: 'http://www.fake.com/2.jpg')
    get root_path
    assert_select 'img' do |images|
      assert_equal images[0].attr('src'), 'http://www.fake.com/2.jpg'
      assert_equal images[1].attr('src'), 'http://www.fake.com/1.jpg'
    end
  end
end
