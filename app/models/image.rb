class Image < ApplicationRecord
  acts_as_taggable
  validates :url, presence: true
  validates :url, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates :url, format: { with: /jpg/i, message: 'not a jpg image link' }
end
