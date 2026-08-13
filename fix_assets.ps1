$root = 'c:\Users\guto.rsxavier\Documents\GitHub\metalborracha'
Get-ChildItem -Path $root -Filter '*.html' | ForEach-Object {
    $path = $_.FullName
    $text = Get-Content -Path $path -Raw
    $text = [regex]::Replace($text, '(?is)\s*<style\b[^>]*>.*?</style>\s*', "`n<link rel=`"stylesheet`" href=`"assets/css/styles.css`">`n")
    $text = [regex]::Replace($text, '(?is)\s*<script\b[^>]*>.*?</script>\s*', "`n<script src=`"assets/js/main.js`"></script>`n")
    Set-Content -Path $path -Value $text -Encoding utf8
}
Write-Output 'updated html files' 
