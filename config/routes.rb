Rails.application.routes.draw do
  resources :events
  devise_for :users, controllers: {
    registrations: "users/registrations"
  }

  resources :licenses, only: :new

  defaults format: :json do
    namespace :api do
      namespace :v1 do
        namespace :tasks do
          resource :bulk, only: :update
        end
        resources :events, only: :index
        resources :tasks
        resource :user, only: :show
      end
    end
  end

  root "homepage#index"
  get "/docs/*id" => "pages#show", :as => :page, :format => false
end
