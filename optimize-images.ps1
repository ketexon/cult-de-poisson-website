$("*.jpg", "*.jpeg", "*.png") |
Foreach-Object {
	Get-ChildItem . -Filter $_ -Recurse |
	Foreach-Object {
		$NewPath = [io.path]::ChangeExtension($_.FullName, ".webp")
		if(!(Test-Path $NewPath) -or ((Get-Item $NewPath).LastWriteTime -lt $_.LastWriteTime)) {
			magick.exe convert -auto-orient $_.FullName $NewPath
			Write-Output "Converting `"$(Resolve-Path -Relative $_.FullName)`" to `"$(Resolve-Path -Relative $NewPath)`""
		}
	}
}