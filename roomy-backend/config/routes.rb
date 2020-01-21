Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :create, :destroy, :update]
  resources :listings, only: [:show, :index, :update, :destroy, :create]
  resources :characteristics, except: [:edit, :new, :show]
end
