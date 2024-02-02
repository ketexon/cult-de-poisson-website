$("*.jpg", "*.jpeg") |
Foreach-Object {
	Get-ChildItem . -Filter $_ -Recurse |
	Foreach-Object {
		$NewName = [io.path]::ChangeExtension($_.FullName, ".webp")
		magick.exe convert -auto-orient $_.FullName $NewName
	}
}