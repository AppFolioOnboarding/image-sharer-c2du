Rails.application.routes.draw do
  resources :images, only: %i[index new show create destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'images#index'

  resources :feedbacks, only: [:new]

  namespace :api do
    resource :feedbacks, only: [:create]
  end
end
