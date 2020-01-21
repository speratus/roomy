Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :create, :delete, :update]
  resources :listings, only: [:show, :index, :update, :delete, :create]
  resources :characteristics, except: [:edit, :new]
end
