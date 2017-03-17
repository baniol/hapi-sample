// node {
//     stage 'Checkout'
//     checkout scm
//
//
//     def tagName = gitTagName()
//     echo "Tag Name: $tagName"
//     def build = (tagName ==~ /devtest-.*/);
//     echo "Pass? $build"
//     if (!build) {
//       return
//     }
//
//     stage 'After'
//     echo "lallalala"
// }

node {
    // checkout([
    //     $class: 'GitSCM',
    //     branches: [[name: '*/master']],
    //     // userRemoteConfigs: [[
    //     //     refspec: 'refs/tags/devtest*'
    //     // ]]
    // ])
    checkout([
         $class: 'GitSCM',
         branches: scm.branches,
         doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
         extensions: scm.extensions,
         userRemoteConfigs: scm.userRemoteConfigs
    ])
    sh 'git log -n 10 --graph --pretty=oneline --abbrev-commit --all --decorate=full'
}

/** @return The tag name, or `null` if the current commit isn't a tag. */
String gitTagName() {
    commit = getCommit()
    if (commit) {
        desc = sh(script: "git describe --tags ${commit}", returnStdout: true)?.trim()
        if (isTag(desc)) {
            return desc
        }
    }
    return null
}

String getCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}

@NonCPS
boolean isTag(String desc) {
    match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
    result = !match
    match = null // prevent serialisation
    return result
}
