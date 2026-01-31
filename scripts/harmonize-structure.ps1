param([switch]$DryRun, [switch]$Archive = $true)

$root = Split-Path -Parent $PSScriptRoot
$archivePath = Join-Path $root "archive\prototypes"

Write-Host "Starting harmonization..."

if (-not (Test-Path $archivePath)) {
    if ($DryRun) { Write-Host "Would create $archivePath" }
    else { New-Item -ItemType Directory -Path $archivePath -Force | Out-Null }
}

$folders = @(
    'about_footballhub+',
    'account_settings',
    'advanced_filters_overlay',
    'advanced_player_analytics',
    'ai_predictions_hub',
    'app_icon_showcase',
    'app_splash_screen',
    'billing_&_invoices',
    'checkout_&_payment',
    'club_live_chat',
    'community_hub',
    'create_your_account',
    'dashboard_-_light_mode',
    'digital_ticket_&_qr',
    'fantasy_league_dashboard',
    'fixtures_&_live_scores',
    'follow_your_teams',
    'footballhub+_dashboard',
    'forum_discussion_thread',
    'global_search_hub',
    'help_&_support_center',
    'hubbot_ai_support_chat',
    'immersive_video_player',
    'live_score_widgets_overview',
    'loyalty_rewards_hub',
    'manage_fantasy_squad',
    'marketing__ai_hub_preview',
    'marketing__match_center_preview',
    'marketing__shop_&_rewards_preview',
    'match-day_live_mode',
    'match_center_&_tactics_1',
    'match_center_&_tactics_2',
    'match_center_&_tactics_3',
    'membership_card_activation',
    'membership_tiers',
    'my_tickets',
    'news_&_media_hub',
    'notification_center',
    'notification_preferences',
    'onboarding_success_celebration',
    'order_confirmation',
    'order_history',
    'partners_&_sponsorship',
    'player_profile_&_stats',
    'premium_news_article',
    'privacy_&_data_control',
    'raja_ca_club_profile',
    'refer_a_friend',
    'referee_performance_hub',
    'referee_profile_&_analytics',
    'staff_ticket_scanner',
    'subscription_management',
    'transfer_details_&_analysis',
    'transfer_market_hub',
    'user_profile',
    'welcome_back_login',
    'welcome_to_footballhub+',
    'wydad_ac_club_profile'
)

foreach ($folder in $folders) {
    $src = Join-Path $root $folder
    if (Test-Path $src) {
        if ($DryRun) { Write-Host "Would move $folder" }
        else {
            Move-Item -Path $src -Destination $archivePath -Force
            Write-Host "Moved $folder"
        }
    }
}

Write-Host "Cleanup complete."
