/*function loadStats(response){

$('#statstab').empty();
document.getElementById('statstab').style.opacity = '1';
document.getElementById('statstab').style.pointerEvents = 'unset';

var users_box = document.createElement('box');
users_box.setAttribute('class','users_box');

var total_users = document.createElement('p');
total_users.setAttribute('class','t_u');
total_users.innerText = 'Total Users: ' + response.success.users;

var total_users_this_month = document.createElement('p');
total_users_this_month.setAttribute('class','t_u_t_m');
total_users_this_month.innerText = response.success.users_this_month + ' Users joined this month.';

var total_premium_users = document.createElement('p');
total_premium_users.setAttribute('class','t_p_u');
total_premium_users.innerText = response.success.premium_users + ' Users are premium users.';

var total_deactivated_users_this_month = document.createElement('p');
total_deactivated_users_this_month.setAttribute('class','t_d_u_t_m');
total_deactivated_users_this_month.innerText = response.success.users_deactivated_this_month + ' Users deactivated this month.';

var total_deactivated_users = document.createElement('p');
total_deactivated_users.setAttribute('class','t_d_u');
total_deactivated_users.innerText = response.success.users_deactivated + ' Users deactivated.';

var total_user_logins_this_month = document.createElement('p');
total_user_logins_this_month.setAttribute('class','t_u_l_t_m');
total_user_logins_this_month.innerText = 'Users logged in '+ response.success.total_logins_this_month + ' times this month.';

users_box.appendChild(total_users);
users_box.appendChild(total_users_this_month);
users_box.appendChild(total_premium_users);
users_box.appendChild(total_deactivated_users);
users_box.appendChild(total_deactivated_users_this_month);
users_box.appendChild(total_user_logins_this_month);

//----------------------

var sales_box = document.createElement('box');
sales_box.setAttribute('class','sales_box');

var total_sales = document.createElement('p');
total_sales.setAttribute('class','t_s');
total_sales.innerText = 'Total Sales: ' + response.success.sales;

var total_sales_this_month = document.createElement('p');
total_sales_this_month.setAttribute('class','t_s_t_m');
total_sales_this_month.innerText = response.success.sales_this_month + ' Sales were completed this month.';

var total_money_earned_this_month = document.createElement('p');
total_money_earned_this_month.setAttribute('class','t_m_e_t_m');
total_money_earned_this_month.innerText = Math.round(response.success.tmetm * 100) / 100+'$ Earned this month.';

var total_money_earned = document.createElement('p');
total_money_earned.setAttribute('class','t_m_e');
total_money_earned.innerText = Math.round(response.success.tme * 100) / 100+'$ Earned.';

sales_box.appendChild(total_sales);
sales_box.appendChild(total_sales_this_month);
sales_box.appendChild(total_money_earned);
sales_box.appendChild(total_money_earned_this_month);

//----------------------

var storage_box = document.createElement('box');
storage_box.setAttribute('class','storage_box');

var total_items_saved = document.createElement('p');
total_items_saved.setAttribute('class','t_i');
total_items_saved.innerText = 'Total Items Saved: ' + response.success.items;

var total_items_saved_this_month = document.createElement('p');
total_items_saved_this_month.setAttribute('class','t_i_t_m');
total_items_saved_this_month.innerText = response.success.items_this_month + ' items were saved this month.';

var total_animations_saved = document.createElement('p');
total_animations_saved.setAttribute('class','t_a_s');
total_animations_saved.innerText = 'Total animations saved: ' + response.success.animations+ '.';

var total_elements_saved = document.createElement('p');
total_elements_saved.setAttribute('class','t_e_s');
total_elements_saved.innerText = 'Total elements saved: ' + response.success.elements+ '.';

var total_divs_saved = document.createElement('p');
total_divs_saved.setAttribute('class','t_d_s');
total_divs_saved.innerText = '  -Divs: ' + response.success.divs+ '.';

var total_buttons_saved = document.createElement('p');
total_buttons_saved.setAttribute('class','t_d_s');
total_buttons_saved.innerText = '  -Buttons: ' + response.success.buttons+ '.';

var total_images_saved = document.createElement('p');
total_images_saved.setAttribute('class','t_img_s');
total_images_saved.innerText = '  -Images: ' + response.success.images+ '.';

var total_videos_saved = document.createElement('p');
total_videos_saved.setAttribute('class','t_vid_s');
total_videos_saved.innerText = '  -Videos: ' + response.success.videos+ '.';

var total_textinputs_saved = document.createElement('p');
total_textinputs_saved.setAttribute('class','t_ti_s');
total_textinputs_saved.innerText = '  -Textinputs: ' + response.success.textinputs+ '.';

var total_textareas_saved = document.createElement('p');
total_textareas_saved.setAttribute('class','t_ta_s');
total_textareas_saved.innerText = '  -Textareas: ' + response.success.textareas+ '.';

var total_paragraphs_saved = document.createElement('p');
total_paragraphs_saved.setAttribute('class','t_p_s');
total_paragraphs_saved.innerText = '  -Paragraphs: ' + response.success.paragraphs+ '.';

var total_headings_saved = document.createElement('p');
total_headings_saved.setAttribute('class','t_h_s');
total_headings_saved.innerText = '  -Headings: ' + response.success.headings+ '.';

storage_box.appendChild(total_items_saved);
storage_box.appendChild(total_items_saved_this_month);
storage_box.appendChild(total_animations_saved);
storage_box.appendChild(total_elements_saved);
storage_box.appendChild(total_divs_saved);
storage_box.appendChild(total_images_saved);
storage_box.appendChild(total_videos_saved);
storage_box.appendChild(total_buttons_saved);
storage_box.appendChild(total_textareas_saved);
storage_box.appendChild(total_textinputs_saved);
storage_box.appendChild(total_paragraphs_saved);
storage_box.appendChild(total_headings_saved);

//----------------------

var planupgradebox = document.createElement('box');
planupgradebox.setAttribute('class','planupgradebox');

var total_plan_upgrades = document.createElement('p');
total_plan_upgrades.setAttribute('class','t_pu');
total_plan_upgrades.innerText = 'Total Plan Upgrades: ' + response.success.planupgrades;

var total_plan_upgrades_this_month = document.createElement('p');
total_plan_upgrades_this_month.setAttribute('class','t_pu_t_m');
total_plan_upgrades_this_month.innerText = response.success.planupgrades_this_month + ' Users upgraded their plan this month.';

var total_goldplan_upgrades = document.createElement('p');
total_goldplan_upgrades.setAttribute('class','t_pu_g');
total_goldplan_upgrades.innerText = 'Total Gold Plan Upgrades: ' + response.success.planupgrades_gold;

var total_bronzeplan_upgrades = document.createElement('p');
total_bronzeplan_upgrades.setAttribute('class','t_pu_b');
total_bronzeplan_upgrades.innerText = 'Total Bronze Plan Upgrades: ' + response.success.planupgrades_bronze;

var total_silverplan_upgrades = document.createElement('p');
total_silverplan_upgrades.setAttribute('class','t_pu_s');
total_silverplan_upgrades.innerText = 'Total Silver Plan Upgrades: ' + response.success.planupgrades_silver;

var total_diamondplan_upgrades = document.createElement('p');
total_diamondplan_upgrades.setAttribute('class','t_pu_d');
total_diamondplan_upgrades.innerText = 'Total Diamond Plan Upgrades: ' + response.success.planupgrades_diamond;

planupgradebox.appendChild(total_plan_upgrades);
planupgradebox.appendChild(total_plan_upgrades_this_month);
planupgradebox.appendChild(total_bronzeplan_upgrades);
planupgradebox.appendChild(total_goldplan_upgrades);
planupgradebox.appendChild(total_silverplan_upgrades);
planupgradebox.appendChild(total_diamondplan_upgrades);

//----------------------

var supporticketbox = document.createElement('box');
supporticketbox.setAttribute('class','supporticketbox');

var total_supporttickets = document.createElement('p');
total_supporttickets.setAttribute('class','t_st');
total_supporttickets.innerText = 'Total Support Tickets: ' + response.success.tickets;

var total_supporttickets_this_month = document.createElement('p');
total_supporttickets_this_month.setAttribute('class','t_st_t_m');
total_supporttickets_this_month.innerText = response.success.tickets_this_month + ' Tickets were opened this month.';

var total_supporttickets_open = document.createElement('p');
total_supporttickets_open.setAttribute('class','t_st_o');
total_supporttickets_open.innerText = 'Tickets Open: ' + response.success.tickets_open;

var total_supporttickets_closed = document.createElement('p');
total_supporttickets_closed.setAttribute('class','t_st_c');
total_supporttickets_closed.innerText = 'Tickets Closed: ' + response.success.tickets_closed;

supporticketbox.appendChild(total_supporttickets);
supporticketbox.appendChild(total_supporttickets_this_month);
supporticketbox.appendChild(total_supporttickets_open);
supporticketbox.appendChild(total_supporttickets_closed);

$('#statstab').append(users_box);
$('#statstab').append(sales_box);
$('#statstab').append(storage_box);
$('#statstab').append(planupgradebox);
$('#statstab').append(supporticketbox);

}*/
