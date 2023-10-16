# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user

    can :manage, user
    can :manage, Task, user_id: user.id
    can :read, Event, user_id: user.id
    can :bulk_update_tasks, user
  end
end
