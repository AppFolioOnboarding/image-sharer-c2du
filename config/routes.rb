Rails.application.routes.draw do
  resources :images, only: %i[index new show create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'images#index'
  # get '/tagged', to: 'images#tagged', as: :tagged
end
