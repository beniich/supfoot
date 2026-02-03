# Script PowerShell pour déployer sur cPanel via SSH
# Usage: .\deploy-cpanel.ps1

# Configuration
$SSH_HOST = "votre-domaine.com"  # Remplacez par votre domaine
$SSH_USER = "cldindustry"
$SSH_KEY = "$env:USERPROFILE\.ssh\id_rsa_supfoot"
$PROJECT_PATH = "repositories/supfootball"

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║  🚀 Déploiement FootballHub+ sur cPanel  ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""

# Vérifier que la clé SSH existe
if (-not (Test-Path $SSH_KEY)) {
    Write-Host "❌ Clé SSH non trouvée: $SSH_KEY" -ForegroundColor Red
    Write-Host ""
    Write-Host "Veuillez d'abord télécharger la clé privée depuis le serveur." -ForegroundColor Yellow
    Write-Host "Consultez GUIDE_SSH_CONNEXION.md pour plus d'informations." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Clé SSH trouvée" -ForegroundColor Green

# Menu
Write-Host ""
Write-Host "Que voulez-vous faire ?" -ForegroundColor Cyan
Write-Host "1. Vérifier l'environnement" -ForegroundColor White
Write-Host "2. Déployer le backend" -ForegroundColor White
Write-Host "3. Déployer le frontend" -ForegroundColor White
Write-Host "4. Déployer tout (backend + frontend)" -ForegroundColor White
Write-Host "5. Mettre à jour depuis GitHub" -ForegroundColor White
Write-Host "6. Voir le statut PM2" -ForegroundColor White
Write-Host "7. Voir les logs" -ForegroundColor White
Write-Host "8. Ouvrir une session SSH interactive" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Votre choix (1-8)"

# Commandes SSH
$commands = @{
    "1" = "cd $PROJECT_PATH && ./check-environment.sh"
    "2" = "cd $PROJECT_PATH && ./deploy.sh backend"
    "3" = "cd $PROJECT_PATH && ./deploy.sh frontend"
    "4" = "cd $PROJECT_PATH && ./deploy.sh all"
    "5" = "cd $PROJECT_PATH && ./update.sh all"
    "6" = "pm2 status"
    "7" = "pm2 logs --lines 50"
    "8" = ""  # Session interactive
}

if ($commands.ContainsKey($choice)) {
    Write-Host ""
    Write-Host "🔌 Connexion au serveur..." -ForegroundColor Blue
    
    if ($choice -eq "8") {
        # Session interactive
        ssh -i $SSH_KEY "$SSH_USER@$SSH_HOST"
    }
    else {
        # Exécuter la commande
        $command = $commands[$choice]
        Write-Host "📝 Exécution: $command" -ForegroundColor Yellow
        Write-Host ""
        
        ssh -i $SSH_KEY "$SSH_USER@$SSH_HOST" $command
    }
    
    Write-Host ""
    Write-Host "✅ Terminé !" -ForegroundColor Green
}
else {
    Write-Host "❌ Choix invalide" -ForegroundColor Red
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"
