import React, { useState } from 'react';
function SSOConfig({ setAlert }) {
  const [provider, setProvider] = useState('Google');
  const [fields, setFields] = useState({
    clientId: '',
    clientSecret: '',
    callbackUrl: '',
    // CyberArk-specific
    ssoType: 'SAML 2.0',
    entityId: '',
    ssoUrl: '',
    cert: '',
    spEntityId: '',
    acsUrl: '',
    nameIdFormat: 'email',
    attributeMapping: [{ cyberark: '', app: '' }],
    jit: false,
    mfa: false,
    logoutUrl: '',
  });

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setFields(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMappingChange = (idx, key, value) => {
    setFields(f => {
      const mapping = [...f.attributeMapping];
      mapping[idx][key] = value;
      return { ...f, attributeMapping: mapping };
    });
  };

  const addMapping = () => {
    setFields(f => ({ ...f, attributeMapping: [...f.attributeMapping, { cyberark: '', app: '' }] }));
  };

  const removeMapping = idx => {
    setFields(f => ({ ...f, attributeMapping: f.attributeMapping.filter((_, i) => i !== idx) }));
  };

  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 650 }}>
      <h2 style={{ marginBottom: '1.2rem' }}>SSO Configuration</h2>
      <form onSubmit={e => { e.preventDefault(); setAlert({ message: 'SSO settings saved!', result: 'success' }); }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Provider</label><br />
          <select name="provider" value={provider} onChange={e => setProvider(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
            <option>Google</option>
            <option>Okta</option>
            <option>Azure AD</option>
            <option>CyberArk</option>
          </select>
        </div>
        {/* Standard fields for Google/Okta/Azure AD */}
        {(provider !== 'CyberArk') && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>Client ID</label><br />
              <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Client Secret</label><br />
              <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Callback URL</label><br />
              <input name="callbackUrl" value={fields.callbackUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
          </>
        )}
        {/* CyberArk-specific fields */}
        {provider === 'CyberArk' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>SSO Type</label><br />
              <select name="ssoType" value={fields.ssoType} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                <option>SAML 2.0</option>
                <option>OpenID Connect</option>
              </select>
            </div>
            {fields.ssoType === 'SAML 2.0' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Identity Provider Entity ID</label><br />
                  <input name="entityId" value={fields.entityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>SSO URL / IdP Login URL</label><br />
                  <input name="ssoUrl" value={fields.ssoUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>X.509 Certificate</label><br />
                  <textarea name="cert" value={fields.cert} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', minHeight: 60 }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Service Provider Entity ID</label><br />
                  <input name="spEntityId" value={fields.spEntityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>ACS (Callback) URL</label><br />
                  <input name="acsUrl" value={fields.acsUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>NameID Format</label><br />
                  <select name="nameIdFormat" value={fields.nameIdFormat} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                    <option>email</option>
                    <option>persistent</option>
                    <option>transient</option>
                    <option>unspecified</option>
                  </select>
                </div>
              </>
            )}
            {fields.ssoType === 'OpenID Connect' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Client ID</label><br />
                  <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Client Secret</label><br />
                  <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Authorization Endpoint</label><br />
                  <input name="authEndpoint" value={fields.authEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Token Endpoint</label><br />
                  <input name="tokenEndpoint" value={fields.tokenEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>JWKS URI</label><br />
                  <input name="jwksUri" value={fields.jwksUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Redirect URI</label><br />
                  <input name="redirectUri" value={fields.redirectUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Scopes</label><br />
                  <input name="scopes" value={fields.scopes || ''} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                </div>
              </>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label>Attribute Mapping</label><br />
              {fields.attributeMapping.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <input placeholder="CyberArk Attribute" value={m.cyberark} onChange={e => handleMappingChange(idx, 'cyberark', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                  <span style={{ alignSelf: 'center' }}>→</span>
                  <input placeholder="App Field" value={m.app} onChange={e => handleMappingChange(idx, 'app', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
                  <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }} onClick={() => removeMapping(idx)}>Remove</button>
                </div>
              ))}
              <button type="button" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, marginTop: '0.3rem' }} onClick={addMapping}>+ Add Mapping</button>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
              <label><input type="checkbox" name="jit" checked={fields.jit} onChange={handleField} /> Enable JIT User Provisioning</label>
              <label><input type="checkbox" name="mfa" checked={fields.mfa} onChange={handleField} /> Enable Multi-Factor Authentication</label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Logout URL (optional)</label><br />
              <input name="logoutUrl" value={fields.logoutUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
          </>
        )}
        <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }}>Save</button>
      </form>
    </div>
  );
}
export default SSOConfig;
