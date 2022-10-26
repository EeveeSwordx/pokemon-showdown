import type {Translations} from '../../server/chat';

export const translations: Translations = {
	strings: {
		"Server version: <b>${version}</b>": "サーバーのバージョン: <b>${version}</b>",
		"/mee - must not start with a letter or number": "文字や数字を最初においてはいけません。",
		"What?! How are you not more excited to battle?! Try /battle! to show me you're ready.": "バトルが盛り上がってないって!?覚悟を決めて、/battle! だ!",
		"Access denied for custom avatar - make sure you're on the right account?": "このカスタムアバターを使用する権限がありません。許可されているアカウントでログインしてください。",
		"Invalid avatar.": "アバター名が正しくありません。",
		"Avatar changed to:": "アバターを次のものに変更しました。",
		"Artist: ": "作者: ",
		"No one has PMed you yet.": "誰もあなたにPMを送っていません。",
		"You forgot the comma.": "コンマを忘れていませんか?",
		"User ${targetUsername} not found. Did you misspell their name?": "ユーザー名:${targetUsername}は見つかりませんでした。名前を間違えていませんか?",
		"User ${targetUsername} is offline.": "ユーザー名:${targetUsername}は見つかりませんでした。",
		"The user \"${targetUsername}\" was not found.": "ユーザー名:\"${targetUsername}\"は見つかりませんでした。",
		"The room \"${target}\" was not found.": "チャットルーム:\"${target}\"は見つかりませんでした。",
		"You do not have permission to invite people into this room.": "あなたはこの部屋でユーザーを招待する権限を持っていません。",
		"This user is already in \"${targetRoom.title}\".": "このユーザーはすでに\"${targetRoom.title}\"にいます。",
		"Setting status messages in /busy is no longer supported. Set a status using /status.": "/busyでのステータスメッセージの設定はサポートされなくなりました。ステータスメッセージの設定は、/statusを使って行ってください。",
		"Setting status messages in /away is no longer supported. Set a status using /status.": "/awayでのステータスメッセージの設定はサポートされなくなりました。ステータスメッセージの設定は、/statusを使って行ってください。",
		"User '${target}' not found.": "ユーザー名'${target}'は見つかりませんでした。",
		"${targetUser.name} does not have a status set.": "${targetUser.name}はステータスメッセージを設定していません。",
		"${targetUser.name}'s status \"${targetUser.userMessage}\" was cleared by ${user.name}${displayReason}": "${targetUser.name}のステータスメッセージは${user.name}によって消去されました。${displayReason}",
		"You don't have a status message set.": "ステータスメッセージを設定していません。",
		"You have cleared your status message.": "ステータスメッセージを消去しました。",
		"This user has not played any ladder games yet.": "このユーザーはレートが有効なバトルをしていません。",
		"W[TN: initial for Wins]": "W(Winsの頭文字)",
		"L[TN: initial for Losses]": "L(Lossesの頭文字)",
		"You already have the temporary symbol '${group}'.": "あなたはすでに一時的なランクである'${group}'になっています。",
		"You must specify a valid group symbol.": "有効なランクの記号を特定する必要があります。",
		"You may only set a temporary symbol below your current rank.": "現在のランクより下の一時的なシンボルしか設定できません。",
		"Your temporary group symbol is now": "あなたの一時的なランクの記号",
		"Currently, you're viewing Pokémon Showdown in ${language}.": "現在、Pokémon Showdownを${language}で表示しています。",
		"Valid languages are: ${languages}": "有効な言語一覧: ${languages}",
		"Pokémon Showdown will now be displayed in ${language} (except in language rooms).": "Pokémon Showdownは言語部屋以外の場所は${language}で表示されます。",
		"Note that rooms can set their own language, which will override this setting.": "言語部屋ではそれぞれが独自の言語を設定でき、その場合はユーザー設定より部屋の設定が優先されます。",
		"/updatesettings expects JSON encoded object.": "/updatesettings を使用するには、JSONにエンコードされたデータが必要です。",
		"Unable to parse settings in /updatesettings!": "/updatesettings において、設定に使用するJSONを解析することができません。",
		"Must be in a battle.": "バトルの中でなければいけません。",
		"User ${target} not found.": "ユーザー ${target} は見つかりませんでした。",
		"Must be a player in this battle.": "プレイヤーである必要があります。",
		"${targetUser.name} has not requested extraction.": "${targetUser.name} は解析を要求していません。",
		"You have already consented to extraction with ${targetUser.name}.": "あなたはすでに${targetUser.name}と解析に同意しています。",
		"${user.name} consents to sharing battle team and choices with ${targetUser.name}.": "${user.name}と${targetUser.name}はバトルチームや技の選択を共有することに同意します。",
		"No input log found.": "インプットされたログが見つかりませんでした。",
		"${targetUser.name} has extracted the battle input log.": "${targetUser.name}がバトルのログを出力しました。",
		"This command only works in battle rooms.": "このコマンドはバトル内のみで有効です。",
		"This command only works when the battle has ended - if the battle has stalled, use /offertie.": "このコマンドはバトルが終わった後に有効になります。バトルが長引いた場合は、/offertie を使用してください。",
		"Alternatively, you can end the battle with /forcetie.": "あるいは/forcetie で強制的にバトルを引き分けにすることもできます。",
		"${user.name} has extracted the battle input log.": "${user.name}がバトルのログを出力しました。",
		"You already extracted the battle input log.": "あなたはすでにログを出力しています。",
		"Battle input log re-requested.": "ログの出力が再要求されました。",
		"Invalid input log.": "不正なログです。",
		"Your input log contains untrusted code - you must have console access to use it.": "入力ログには信頼されていないコードが含まれています。これを使用するにはコンソールへのアクセス権が必要です。",
		"This command can only be used in a battle.": "このコマンドはバトル内でのみ使用できます。",
		"Only players can extract their team.": "プレイヤーのみがチームの詳細を閲覧できます。",
		"Use a number between 1-6 to view a specific set.": "セットを出力するには1から6の間の数字を指定してください。",
		"The Pokemon \"${target}\" is not in your team.": "\"${target}\"はあなたのチームの中にはいません。",
		"That Pokemon is not in your team.": "そのポケモンはあなたのチームの中にはいません。",
		"View team": "チームを見る",
		"Must be in a battle room.": "バトルの中でなければいけません。",
		"This server does not allow offering ties.": "このサーバーでは引き分けの提案が許可されていません。",
		"You can't offer ties in tournaments.": "トーナメントでは引き分けを提案できません。",
		"It's too early to tie, please play until turn 100.": "引き分けの提案が早すぎます。100ターンまで待ってください。",
		"No other player is requesting a tie right now. It was probably canceled.": "他のプレイヤーは引き分けを提案していません。おそらくキャンセルされました。",
		"${user.name} is offering a tie.": "${user.name}が引き分けを提案しています。",
		"Accept tie": "引き分けの提案を受け入れる",
		"Reject": "引き分けの提案を拒否する",
		"Must be a player to accept ties.": "引き分けを受け入れるにはプレイヤーである必要があります。",
		"You have already agreed to a tie.": "すでに引き分け同意しています。",
		"${user.name} accepted the tie.": "${user.name}が引き分けに同意しました。",
		"All players have accepted the tie.": "全てのプレイヤーが引き分けに同意しました。",
		"Must be a player to reject ties.": "引き分けを拒否するにはプレイヤーである必要があります。",
		"${user.name} rejected the tie.": "${user.name}が引き分けを拒否しました。",
		"This room doesn't have an active game.": "この部屋には、進行中のゲームがありません。",
		"This kind of game can't be forfeited.": "この種類のゲームは降参できません。",
		"This game doesn't support /choose": "このゲームでは\"/choose\"が使えません。",
		"This game doesn't support /undo": "このゲームでは\"/undo\"が使えません。",
		"You can only save replays for battles.": "リプレイが保存できるのはバトルだけです。",
		"This battle can't have hidden replays, because the tournament is set to be forced public.": "トーナメントの設定でこのバトルを隠し部屋にすることが許されていません。",
		"The replay for this battle is already set to hidden.": "このバトルのリプレイはすでに隠されています。",
		"${user.name} hid the replay of this battle.": "${user.name}がこのバトルのリプレイを非表示にしました。",
		"You can only do this in battle rooms.": "これはバトル部屋のみで使えます。",
		"You can only add a Player to unrated battles.": "プレイヤーを追加できるのはレートが有効でないバトルのみです。",
		"Player must be set to \"p1\" or \"p2\", not \"${target}\".": "プレイヤーは \"${target}\"ではなく\"p1\"か\"p2\"に設定しなければなりません。",
		"User ${name} not found.": "ユーザー ${name} は見つかりませんでした。",
		"User ${name} must be in the battle room already.": "ユーザー \"${name}\"はすでに入室しています。",
		"This room already has a player in slot ${target}.": "スロット ${name}にはすでにユーザーが割り当てられています。",
		"Player 2": "プレイヤー2",
		"Players could not be restored (maybe this battle already has two players?).": "プレイヤーの復元ができませんでした。(このバトルにすでに2人プレイヤーがいるからかもしれません。)",
		"This game doesn't support /joingame": "このゲームは /joingame が使えません。",
		"This game doesn't support /leavegame": "このゲームは /leavegame が使えません。",
		"You can only do this in unrated non-tour battles.": "これはトーナメントでなくかつレートが有効ではないバトルでのみ有効です。",
		"User ${targetUsername} not found.": "ユーザー ${targetuser.name} は見つかりませんでした。",
		"${targetUser.name} was kicked from a battle by ${user.name} ${displayReason}": "${targetUser.name}は${user.name}によってバトルからキックされました。(${displayReason})",
		"You can only set the timer from inside a battle room.": "タイマーはバトル部屋の中で設定できます。",
		"This game's timer is managed by a different command.": "このゲームのタイマーは他のコマンドで管理されています。",
		"The game timer is OFF.": "ゲームのタイマーがオフになりました。",
		"The game timer is ON (requested by ${requester})": "ゲームのタイマーがオンになりました(${requester}が設定しました)",
		"Access denied.": "アクセスが拒否されました。",
		"Timer was turned off by staff. Please do not turn it back on until our staff say it's okay.": "スタッフがタイマーをオフに設定しました。スタッフの許可を得るまで、元に戻さないでください。",
		"The timer is already off.": "タイマーは既にオフに設定されています。",
		"\"${target}\" is not a recognized timer state.": "\"${target}\"は認識できないタイマーの状態です。",
		"Forcetimer is now OFF: The timer is now opt-in. (set by ${user.name})": "強制的なタイマーがオフになりました。(by ${user.name})",
		"Forcetimer is now ON: All battles will be timed. (set by ${user.name})": "タイマーがオンになりました。すべてのバトルが強制的にタイマーで計測されます。(by ${user.name})",
		"'${target}' is not a recognized forcetimer setting.": "'${target}'は認識できないタイマーの状態です。",
		"This server requires you to be rank ${groupName} or higher to search for a battle.": "このサーバーでは、バトルを検索するためにはランクが${groupName}以上であることが必要です。",
		"Since you have reached ${Config.forceregisterelo} ELO in ${target}, you must register your account to continue playing that format on ladder.": "ELOレートが${target}で${Config.forceregisterelo}に達したので、アカウントを登録する必要があります。",
		"Register": "登録",
		"The user '${targetUsername}' was not found.": "ユーザー \"${targetUsername}\"は見つかりませんでした。",
		"You are locked and cannot challenge unlocked users. If this user is your friend, ask them to challenge you instead.": "あなたはロックされており、ロックされていないユーザーにchallengeすることはできません。このユーザーがあなたの友人である場合は、代わりにchallengeするよう依頼してください",
		"You are banned from battling and cannot challenge users.": "あなたはバトルをすることを禁止されているため、ほかのユーザーにchallengeすることはできません。",
		"You must choose a username before you challenge someone.": "誰かにchallengeする前にユーザー名を決める必要があります。",
		"This server requires you to be rank ${groupName} or higher to challenge users.": "このサーバーでは、ユーザーにchallengeするためにはランクが${groupName}以上であることが必要です。",
		"This command does not support specifying multiple users": "このコマンドでは複数のユーザーを指定できません",
		"User \"${targetUsername}\" not found.": "ユーザー \"${targetUsername}\"は見つかりませんでした。",
		"Provide a valid format.": "有効なフォーマット名を入力してください",
		"Please provide a valid format.": "有効なフォーマット名を入力してください",
		"The format '${originalFormat.name}' was not found.": "フォーマット\"${originalFormat.name}\"は見つかりませんでした。",
		"Your team is valid for ${format.name}.": "このチームは \"${format.name}\"に適合しています。",
		"Your team was rejected for the following reasons:": "このチームは以下の理由によって不適切です。",
		"Battles are now hidden (except to staff) in your trainer card.": "あなたのトレーナーカードからバトルはスタッフ以外には見えなくなりました",
		"Battles are now visible in your trainer card.": "あなたのトレーナーカードからバトルが見られるようになりました。",
		"'${command}' is a help command.": "\"${command}\"はヘルプコマンドです。",
		"The command '/${target}' does not exist.": "コマンド \"/${target}\"は見つかりませんでした。",
		"Could not find help for '/${target}'. Try /help for general help.": "\"${target}\"のヘルプは見つかりませんでした。\"/help\"で総合的なヘルプを試してみてください。",
		"Could not find help for '/${target}' - displaying help for '/${closestHelp}' instead": "\"/${target}\"のヘルプは見つかりませんでした。\"/${closestHelp}\"のヘルプを表示しています。",
	},
};
