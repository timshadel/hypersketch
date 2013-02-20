repeat forever {
   user_input = get_user_input
   game_state = process_one_frame(game_state, user_input)
   drawing_instructions = draw_everything_on_the_screen(game_state)
   wait until a frame's worth of time has elapsed
}


context = load about:blank (?)
repeat forever {
   user_action = get_user_affordance_action(url bar, click a, fill out form, etc)
   context = process_one_resource_tree(context, user_action)
   render the model
   give model to the user
}


pills_are_visible(Clock) ->
   is_even(Clock div 30).


current_ghost_frame(Clock) ->
   Offset = Clock rem TOTAL_GHOST_ANIMATION_LENGTH,
   Offset div TIME_PER_ANIMATION_FRAME.


{Id, Position, State}

  {X, Y}
  {X, Y, XVelocity, YVelocity}

  {Name, StartTime, EndTime}
  {Name, StartTime, EndTime, SomeStateSpecificData}


{new_position, Coordinates} = f(relevant_state)
{ate_ghost, GhostName}
{ate_dot, Coordinates}
ate_fruit
killed_by_ghost

