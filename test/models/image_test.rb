require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'base case' do
    image = Image.new(url: 'http://www.fake.com/1.jpg')
    assert_predicate image, :valid?
  end

  test 'not present case' do
    image = Image.new(url: '')
    assert_not_predicate image, :valid?
  end

  test 'invalid case' do
    image = Image.new(url: 'lasdkjflaksd')
    assert_not_predicate image, :valid?
  end

  test 'not jpg case' do
    image = Image.new(url: 'http://www.fake.com/1.png')
    assert_not_predicate image, :valid?
    assert_includes image.errors[:url], 'not a jpg image link'
  end

  test 'valid case with tags' do
    image = Image.new(url: 'http://www.fake.com/1.jpg', tag_list: 'pig, dog')
    assert_predicate image, :valid?
  end
end
